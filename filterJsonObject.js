var data = {
  "message": "success",
  "data": [
    {
      "tags": [],
      "_id": "64132359f79715c8066b4533",
      "oldId": 1715440,
      "type": "SPEAKING_REPEAT_SENTENCE",
      "text": null,
      "imageUrl": null,
      "topic": null,
      "audioLink": "https://storage.googleapis.com/pte-magic-question-2018/question_1715440_SPEAKING_REPEAT_SENTENCE_stdnew.mp3",
      "keyword": null,
      "answer": "Please write your name on essay cover sheet.",
      "repeated": false,
      "activated": true,
      "description": null,
      "phraseHints": null,
      "choices": [],
      "createdDate": "2020-06-06T01:39:02.866Z",
      "orderId": "RS0001"
    },
    {
        "tags": [],
        "_id": "64132359f79715c8066b4539",
        "oldId": 1716020,
        "type": "SPEAKING_REPEAT_SENTENCE",
        "text": null,
        "imageUrl": null,
        "topic": null,
        "audioLink": "https://storage.googleapis.com/pte-magic-question-2018/question_1716020_SPEAKING_REPEAT_SENTENCE_stdnew.mp3",
        "keyword": null,
        "answer": "The scientists use the web to explore the problem.",
        "repeated": false,
        "activated": true,
        "description": null,
        "phraseHints": null,
        "choices": [],
        "createdDate": "2020-06-06T01:39:02.866Z",
        "orderId": "RS0002"
      }
]
};

var newData = data.data.map(({type, audioLink, answer, orderId,repeated,difficulty}) => ({type, audioLink, answer, orderId,repeated,difficulty}));
JSON.stringify(newData);