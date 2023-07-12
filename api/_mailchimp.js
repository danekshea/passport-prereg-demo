import mailchimp from "@mailchimp/mailchimp_marketing";
import dotenv from "dotenv";

dotenv.config();


mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function testMailChimpAPI() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

export async function addMemberToList(pEmail) {
  try {
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;
    const subscribingUser = {
      email: pEmail,
    };
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
  } catch (error) {
    console.error(`An error occurred while adding the contact to the audience list.`);
    throw error;
  }
}