const _ = require('lodash')
const microCors = require('micro-cors')
const {json, send} = require('micro')

const teams = [
  {
    id: 1,
    name: 'Ice Dukes',
    points: 16
  },
  {
    id: 2,
    name: 'EHC Sharks',
    points: 16
  },
  {
    id: 3,
    name: 'SC Kloten Flames',
    points: 14
  },
  {
    id: 4,
    name: 'EHC Sagmäälfäger',
    points: 14
  },
  {
    id: 5,
    name: 'HC Wild Piranhas',
    points: 12
  },
  {
    id: 6,
    name: 'Another Team',
    points: 0
  }
]

const games = [
  [5,6], [3,6], [2,6], [5,3],
  [3,4], [5,6],
  // [1,6], [1,6], [1,6]
]

function stayOrLeave (_teams, _games) {
  const teams = _.cloneDeep(_teams)
  const games = _.cloneDeep(_games)
  const end = _.reduce(games, function(table, value, key) {
    const randomnumber = Math.floor(Math.random() * 3)

    if(randomnumber == 0) {
      const winner = _.find(teams, { 'id': value[0] })
      winner.points +=2
      // console.log('winner', winner)
    }

    if(randomnumber == 1) {
      const winner1 = _.find(teams, { 'id': value[0] })
      const winner2 = _.find(teams, { 'id': value[1] })
      winner1.points +=1
      winner2.points +=1
      // console.log('draw', winner1,winner2)
    }

    if(randomnumber == 2) {
      const winner = _.find(teams, { 'id': value[1] })
      winner.points +=2
      // console.log('winner', winner)
    }

    return table

  }, teams)


  const orderedTable = _.orderBy(end, ['points'], ['asc'])


  const rank = _.findIndex(orderedTable, function(o) { return o.id == 1 })
  // console.log(orderedTable)
  // console.log('rank', rank+1)

  let stay = 0
  let leave = 0
  let runs = 0

  if(rank+1 <= 2) {
    leave = leave + 1
    // console.log('leave')
    return 0
  } else {
    stay = stay + 1
    // console.log('stay')
    return 1
  }
}

// main application
const run = (req, res) => {
  let stay = 0
  let total = 0

  for (var i = 0; i < 100000; i++) {
    total +=1
    if(stayOrLeave(teams, games)) {
      stay +=1
    }
  }
  const message = `Ice Dukes: Wahrscheinlichkeit Verbleib ZEP A 2017/2018: ${Math.floor(100/total*stay)} `
  console.log(message)
  return send(res, 200, message)
}

const cors = microCors({allowMethods: ['GET']})
module.exports = cors(run)
