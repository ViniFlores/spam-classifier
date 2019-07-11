var bayes = require('bayes')

var classifier = bayes()
var spambase = require('./SpamCollection.json')

var hitSpam = 0
var missSpam = 0

var hitHam = 0
var missHam = 0
spambase.forEach((item, index, array) => {
  if (index < 3000)
    classifier.learn(item.content, item.type)
  if (index > 3000) {
    let type = classifier.categorize(item.content)
    if (type == 'spam') {
      if(item.type == 'spam') hitSpam += 1
      else missSpam += 1
    }

    if (type == 'ham') {
      if(item.type == 'ham') hitHam += 1
      else missHam += 1
    }
  }
})

console.log("Hit - Spam: " + hitSpam)
console.log("Miss - Spam: " + missSpam)
console.log("Hit - Ham: " + hitHam)
console.log("Miss - Ham: " + missHam)

// serialize the classifier's state as a JSON string.
var stateJson = classifier.toJson()

// load the classifier back from its JSON representation.
var revivedClassifier = bayes.fromJson(stateJson)