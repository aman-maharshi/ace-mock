export async function GET(request: Request) {
  return Response.json({
    succuess: true,
    data: 'Thank you for your request',
  }, {
    status: 200
  })
}