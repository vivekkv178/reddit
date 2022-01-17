/**
 * If user tries to access thread route without threaId then the user is redirected to home page
 */
export default function Thread() {
  return <></>;
}
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/",
    },
  };
}
