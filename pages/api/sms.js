const MessagingResponse = require('twilio').twiml.MessagingResponse;

export default async (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message('The Robots are coming! Head for the hills!');
    const babyId = 1;
    const baseUrl = `https://${req.headers.host}`;

    fetch(`${baseUrl}/api/graphql`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          {
            "query":"mutation insert_single_activity($object: activities_insert_input! ) {insert_activities_one(object: $object) { id type baby_id created_at updated_at start_at }}",
            "variables": {
              "object": {
                text: req.body.Body,
                baby_id: babyId
              }
            },
            "operationName":"insert_single_activity"}
        ),
      })

    return res.status(200).json({message: "ok"})
}
