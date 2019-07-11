from nltk.corpus import stopwords
import json

stop_words = stopwords.words('english')

json_spambase = []
with open("SMSSpamCollection", "r") as fp:
  line = fp.readline()
  cnt = 1
  while line:
    split_line = line.split('\t', 1)

    for word in stop_words:
      split_line[1] = split_line[1].lower().replace(' ' + word + ' ', ' ')
    
    json_spambase.append({'type': split_line[0], 'content': split_line[1]})

    line = fp.readline()
    cnt += 1

file = open('SpamCollection.json', 'w')
file.write(json.dumps(json_spambase))
file.close()
