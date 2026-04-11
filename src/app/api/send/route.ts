import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        const { data, error } = await resend.emails.send({
            from: 'Weihang Li Portfolio <onboarding@resend.dev>',
            to: ['hanggesimida@gmail.com'],
            subject: `来自 ${name} 的新消息`,
            react: EmailTemplate({ name, email, message }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json({ success: true, data });
    } catch (error) {
        return Response.json({ error: '服务器内部错误' }, { status: 500 });
    }
}
