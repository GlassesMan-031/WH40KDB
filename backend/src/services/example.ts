

export async function getExample(id: number) {
  console.log(id)
  const testData = [
    { id: 0, name: 'test0', jumps: 10 },
    { id: 1, name: 'test1', jumps: 20 },
    { id: 2, name: 'test2', jumps: 30 },
    { id: 3, name: 'test3', jumps: 40 }
  ]

  return testData.find((data) => data.id == id)
}
