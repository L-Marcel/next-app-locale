import { NextRequest, NextResponse } from 'next/server';
import { translator } from './services/Translator';
 
//important!
export async function middleware(request: NextRequest) {
  const redirectURL = translator.middleware(request);

  if(redirectURL) {
    return NextResponse.redirect(redirectURL);
  };

  return NextResponse.next();
};

//important!
export const config = {
  matcher: [
    '/((?!_next).*)'
  ]
};