-- Revoke public execute from has_role to satisfy linter, though it is security definer
-- and only checks the provided user_id, it is better to be explicit.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
