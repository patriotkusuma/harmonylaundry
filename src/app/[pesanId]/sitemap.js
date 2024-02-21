export default async function generateSitemaps({ params }) {

  const pesanId = params.pesanId;
  
  return products.map((product) => ({
    url: `https://harmonylaundrys.com/${pesanId}`,
    lastModified: new Date(),
  }));
}
