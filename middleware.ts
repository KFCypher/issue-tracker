/*export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/issues/new', 
    '/issues/edit/:id+'
    ]
};*/

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/issues/new",
    "/issues/edit/:id+",
  ],
};
