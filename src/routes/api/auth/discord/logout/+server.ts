export function DELETE({ cookies }) {
  cookies.delete('sessionId', { path: '/' });
  return new Response(null, {
    status: 204
  });
}
