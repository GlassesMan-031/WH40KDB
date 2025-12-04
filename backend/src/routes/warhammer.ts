import express from 'express'
import axios from 'axios'
import * as xml2js from 'xml2js'
import { decode } from 'js-base64'


const cat = express.Router()

const parser = new xml2js.Parser()

cat.get('/', (req, res) => {
  axios.get('https://api.github.com/repos/BSData/wh40k-10e/contents/Necrons.cat').then((response) => {
    console.log(response)
    let result = decodeAndFix(response.data.content)
    res.json(result)
  })
})

function decodeAndFix(input: string): any {
  let decoded = decode(input)
  let parsed
  parser.parseString(decoded, (err, result) => {
    parsed = result
  })

  let fixed = recursiveJsonFix(parsed)

  return fixed
}

export default cat

function recursiveJsonFix(obj: any): any {
  let fixedObj: any = {}
  for (let property in obj) {
    if (property !== '$') {
      if (typeof obj[property] == "object" && !Array.isArray(obj[property])) {
        fixedObj[property] = recursiveJsonFix(obj[property])
      } else if (Array.isArray(obj[property])) {
        if (obj[property].length <= 1) {
          fixedObj[property] = recursiveJsonFix(obj[property][0])
        } else {
          let fixedArr = []

          for (let item in obj[property]) {
            let fixedItem = recursiveJsonFix(obj[property][item])
            fixedArr.push(fixedItem)
          }
          fixedObj[property] = fixedArr
        }
      }

    }
  }
  if (obj.hasOwnProperty("$")) {
    for (let property in obj["$"]) {
      fixedObj[property] = obj["$"][property]
    }
  }
  if (obj.hasOwnProperty("$")) {
    fixedObj['value'] = obj['_']
  }

  return fixedObj
}
