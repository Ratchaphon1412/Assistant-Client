
import { redirect } from 'next/navigation'


export async function GET() {
    return redirect(process.env.ENDPOINT_URL + "/api/v1/auth/google");

}
