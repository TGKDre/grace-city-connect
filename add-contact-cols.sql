-- Add contact fields to campuses and fellowships
ALTER TABLE campuses ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE campuses ADD COLUMN IF NOT EXISTS email TEXT DEFAULT '';
ALTER TABLE fellowships ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE fellowships ADD COLUMN IF NOT EXISTS email TEXT DEFAULT '';
