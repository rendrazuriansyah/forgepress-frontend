import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

const REVALIDATE_SECRET_TOKEN = process.env.REVALIDATE_SECRET_TOKEN;

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const secret = authHeader?.split(' ')[1]; // mengambil token dari 'Bearer TOKEN-nya'

  if (!secret || secret !== REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json(
      { message: 'Invalid or missing token' },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { event, model, entry } = body;

    // log untuk debug
    console.log(
      `Webhook received: Event=${event}, Model=${model}, Entry ID= ${entry?.id}, Slug=${entry?.slug}`,
    );

    if (
      model === 'post' &&
      (event === 'entry.create' ||
        event === 'entry.update' ||
        event === 'entry.publish' ||
        event === 'entry.delete' ||
        event === 'entry.unpublish')
    ) {
      // revalidate halaman list posts
      revalidateTag('posts'); // revalidate cache untuk semua posts

      if (entry?.slug) {
        revalidatePath(`/blog/${entry.slug}`);
        revalidateTag(`post-${entry.slug}`); //revalidate cache untuk single post
      }
      console.log(`Revalidating: model=${model}, event=${event}`);
      return NextResponse.json(
        { message: 'Revalidation successful', now: Date.now() },
        { status: 200 },
      );
    } else {
      console.log(`Webhook ignored: model=${model}, event=${event}`);
      return NextResponse.json(
        {
          message: 'Webhook event not configured for revalidation',
          now: Date.now(),
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error('Error processing revalidate webhook:', error);
    return NextResponse.json(
      { message: 'Error processing webhook', error },
      { status: 500 },
    );
  }
}
