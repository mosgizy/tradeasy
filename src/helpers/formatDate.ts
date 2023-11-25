export const formatDate = (dateSTring: string) => {
  const issuedDate = new Date(dateSTring)
  const day = issuedDate.getUTCDate()
  const month = issuedDate.getUTCMonth() + 1
  const year = issuedDate.getUTCFullYear()

  return `${day}-${month}-${year}`
}