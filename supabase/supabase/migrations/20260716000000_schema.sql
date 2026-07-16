-- ==========================================
-- PASSPRO DATABASE DATABASE SCHEMA
-- Target Database: PostgreSQL (Supabase)
-- Feature Focus: Curriculum Units, Study Topics, Flashcards & Spaced Repetition (SM-2)
-- ==========================================

-- Enable the UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS METRICS TABLE (Extended Profile linked directly to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT NOT NULL DEFAULT 'free', -- 'free', 'basic', 'pro', 'elite'
    state TEXT NOT NULL DEFAULT 'Wisconsin',
    exam_date DATE,
    readiness_pct INT NOT NULL DEFAULT 0,
    hours_logged NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    streak_days INT NOT NULL DEFAULT 0,
    xp INT NOT NULL DEFAULT 0,
    last_active TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CURRICULUM UNITS TABLE
CREATE TABLE IF NOT EXISTS public.units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sequence_order INT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    estimated_hours NUMERIC(4, 1) NOT NULL DEFAULT 2.5,
    lesson_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STUDY TOPICS TABLE
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
    sequence_order INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_unit_topic_order UNIQUE (unit_id, sequence_order)
);

-- 4. FLASHCARDS TABLE
CREATE TABLE IF NOT EXISTS public.flashcards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    front TEXT NOT NULL, -- Question or concept term
    back TEXT NOT NULL,  -- Standard answer or definition
    explanation TEXT,    -- In-depth technical context
    is_state_specific BOOLEAN NOT NULL DEFAULT FALSE,
    statute_reference TEXT, -- e.g., "Wis. Stat. § 628.347"
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SPACED REPETITION (SM-2) PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.flashcard_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    flashcard_id UUID NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
    interval INT NOT NULL DEFAULT 1,       -- Current delay interval in days
    ease_factor NUMERIC(4, 2) NOT NULL DEFAULT 2.50, -- Difficulty coefficient multiplier
    reps INT NOT NULL DEFAULT 0,           -- Number of consecutive correct reviews
    next_review TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_reviewed TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_flashcard UNIQUE (user_id, flashcard_id)
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;

-- Users Table Policies
CREATE POLICY "Users can view own metrics" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own metrics" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Curriculum Tables Policies (Public read-only, Admin read/write)
CREATE POLICY "Anyone can view curriculum units" ON public.units
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can view curriculum topics" ON public.topics
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can view flashcards" ON public.flashcards
    FOR SELECT TO authenticated USING (true);

-- Spaced Repetition Policies (Isolated per user)
CREATE POLICY "Users can CRUD own flashcard progress" ON public.flashcard_progress
    FOR ALL USING (auth.uid() = user_id);

-- ==========================================
-- PERFORMANCE OPTIMIZING INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_topics_unit ON public.topics(unit_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_topic ON public.flashcards(topic_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_review ON public.flashcard_progress(user_id, next_review);
CREATE INDEX IF NOT EXISTS idx_progress_card ON public.flashcard_progress(flashcard_id);

-- ==========================================
-- DATABASE FUNCTIONS & TRIGGERS
-- ==========================================

-- Automatically create user profile entry on signup webhook
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, plan, state, xp, streak_days)
    VALUES (new.id, 'free', 'Wisconsin', 0, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- SM-2 spaced repetition ratings rating calculator function
-- Quality Ratings: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy
CREATE OR REPLACE FUNCTION public.rate_flashcard(
    p_user_id UUID,
    p_flashcard_id UUID,
    p_quality INT
) RETURNS JSONB AS $$
DECLARE
    v_interval INT;
    v_ease_factor NUMERIC(4, 2);
    v_reps INT;
    v_next_review TIMESTAMPTZ;
    v_xp_awarded INT := 15; -- Gain 15 XP on every session review
    v_record_exists BOOLEAN;
BEGIN
    -- Validate rating bounds
    IF p_quality < 0 OR p_quality > 3 THEN
        RAISE EXCEPTION 'Quality rating must be between 0 (Again) and 3 (Easy)';
    END IF;

    -- Look up existing tracking records
    SELECT EXISTS(
        SELECT 1 FROM public.flashcard_progress 
        WHERE user_id = p_user_id AND flashcard_id = p_flashcard_id
    ) INTO v_record_exists;

    IF NOT v_record_exists THEN
        v_interval := 1;
        v_ease_factor := 2.50;
        v_reps := 0;
    ELSE
        SELECT interval, ease_factor, reps 
        INTO v_interval, v_ease_factor, v_reps
        FROM public.flashcard_progress
        WHERE user_id = p_user_id AND flashcard_id = p_flashcard_id;
    END IF;

    -- Apply SuperMemo-2 Spaced Repetition Logic
    IF p_quality < 2 THEN
        -- Score 0 or 1: Need reinforcement, reset sequence metrics
        v_interval := 1;
        v_reps := 0;
        v_ease_factor := GREATEST(1.30, v_ease_factor - 0.20);
    ELSE
        -- Score 2 or 3: Correct answer, progress review timing gap
        IF v_reps = 0 THEN
            v_interval := 1;
        ELSIF v_reps = 1 THEN
            v_interval := 3;
        ELSE
            v_interval := ROUND(v_interval * v_ease_factor);
        END IF;
        
        v_reps := v_reps + 1;
        
        -- Adjust complexity variable dynamically
        v_ease_factor := GREATEST(1.30, v_ease_factor + 0.1 - (3 - p_quality) * (0.08 + (3 - p_quality) * 0.02));
    END IF;

    -- Calculate next review date
    v_next_review := NOW() + (v_interval || ' days')::INTERVAL;

    -- Insert or Update tracking record
    INSERT INTO public.flashcard_progress (user_id, flashcard_id, interval, ease_factor, reps, next_review, last_reviewed)
    VALUES (p_user_id, p_flashcard_id, v_interval, v_ease_factor, v_reps, v_next_review, NOW())
    ON CONFLICT (user_id, flashcard_id) DO UPDATE
    SET interval = EXCLUDED.interval,
        ease_factor = EXCLUDED.ease_factor,
        reps = EXCLUDED.reps,
        next_review = EXCLUDED.next_review,
        last_reviewed = EXCLUDED.last_reviewed;

    -- Reward XP and calculate streak updates inside users profile
    UPDATE public.users 
    SET xp = COALESCE(xp, 0) + v_xp_awarded,
        streak_days = CASE 
            WHEN last_active IS NULL OR last_active < NOW() - INTERVAL '36 hours' THEN 1
            WHEN last_active < NOW() - INTERVAL '24 hours' THEN streak_days + 1
            ELSE streak_days
        END,
        last_active = NOW()
    WHERE id = p_user_id;

    RETURN jsonb_build_object(
        'interval', v_interval,
        'ease_factor', ROUND(v_ease_factor, 2),
        'reps', v_reps,
        'next_review', v_next_review,
        'xp_awarded', v_xp_awarded
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
