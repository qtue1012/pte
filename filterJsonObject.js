var data = {
  "message": "success",
  "data": [
    {
      "tags": [],
      "_id": "64132359f79715c8066b464a",
      "oldId": 1772456,
      "type": "LISTENING_SUMMARIZE_SPOKEN_TEXT",
      "text": null,
      "imageUrl": null,
      "topic": "The Impact of The Pandemic ",
      "audioLink": "https://storage.googleapis.com/pte-magic-question-2018/question_1772456_LISTENING_SUMMARIZE_SPOKEN_TEXT_stdnew.mp3",
      "keyword": null,
      "answer": "What we know is that the impact of the pandemic would be catastrophic if it is similar to what we had in 1918. In the United States, there has been unprecedented amount of preparation so far. It’s ..um, affects every aspect of public health. We have efforts for treatment, efforts for better prevention, clinical management, key communications, the domestic and international responses, and also efforts to try to prevent transmission within community.  The federal government has had tremendous amount of resources that they have put into development of the new antiviral drugs, antiviral drugs stock piles; development of new vaccines and manufacturing facilities for vaccines. So, there’s quite a lot that’s happening in the United States. However, developing countries do not have the level of resources found in more developed countries. That’s the real challenge.",
      "repeated": false,
      "activated": true,
      "description": null,
      "phraseHints": "impact, pandemic, catastrophic, United States, preparation, public, health, treatment, prevention, clinical, management, communication, domestic, international, responses, transmission, community, prevent, government, resources, antiviral, drugs, vaccines, facilities, developing, countries, developed",
      "choices": [],
      "createdDate": "2020-06-06T01:39:02.866Z",
      "orderId": "SST0001",
      "difficulty": "easy"
    },
    {
      "tags": [],
      "_id": "64132359f79715c8066b4661",
      "oldId": 27877042,
      "type": "LISTENING_SUMMARIZE_SPOKEN_TEXT",
      "text": null,
      "imageUrl": null,
      "topic": "Natural Resources in Canada",
      "audioLink": "https://storage.googleapis.com/pte-magic-question-2018/question_20211103_1635957563816.mp3",
      "keyword": null,
      "answer": "Canada is a country of the enormous natural resources. It is the world’s largest exporter of forest products and a top exporter of fish, furs, and wheat. Minerals have played a key role in Canada’s transformation into an urban-industrial economy. Alberta, British Columbia, Quebec, and Saskatchewan are the principal mining regions. Ontario and the Northwest (NWT) and Yukon Territories are also significant producer of uranium and potash, the third-largest of asbestos, gypsum, and nickel, and the fourth-largest of zinc. Oil and gas are exploited in Alberta, off the Atlantic coast, and in the northwest – huge additional reserves are thought to exist in the high Arctic; oil price is making extraction profitable at a growing number of the country’s deposit. Canada is also one of the world’s top hydroelectricity producers.",
      "repeated": false,
      "activated": true,
      "description": null,
      "phraseHints": "Northwest, Alberta, Canada, oil, exporter, world",
      "choices": [],
      "createdDate": "2021-11-03T09:40:15.017Z",
      "orderId": "SST0002",
      "difficulty": "hard"
    }
  ]
};

var newData = data.data.map(({ type, audioLink, answer, orderId, repeated, difficulty }) => ({ type, audioLink, answer, orderId, repeated, difficulty }));
JSON.stringify(newData);