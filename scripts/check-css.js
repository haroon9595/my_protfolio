async function main() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  const match = html.match(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/);
  console.log('CSS URL:', match ? match[1] : 'NOT FOUND');
  if (match) {
    const cssRes = await fetch('http://localhost:3000' + match[1]);
    const css = await cssRes.text();
    console.log('CSS Length:', css.length);
    console.log('Has .flex:', css.includes('.flex'));
    console.log('Has #7C3AED:', css.toLowerCase().includes('7c3aed'));
    console.log('First 200 chars:', css.slice(0, 200));
  }
}
main().catch(console.error);
