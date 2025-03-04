/** Remove /assets/ and file extension
*   and capitalizes file name */
export const Rename = (t: string): string => {
  // Decode URL-encoded characters
  t = decodeURIComponent(t);

  // Remove /assets/ and file extension
  t = t.split('/').pop()!.split('.')[0];

  // Remove the vite build section
  t = t.split('-') ? t.split('-')[0] : t;

  // Capitalize the first letter
  let tArr = t.split("");
  tArr[0] = tArr[0]?.toUpperCase();
  t = tArr.join().replace(/,/g, '');

  return t || "";
};

export default Rename;
