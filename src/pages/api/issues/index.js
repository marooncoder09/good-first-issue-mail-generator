import { Octokit } from "octokit"
import  fs  from "fs"
import  path  from "path"
import { Novu } from "@novu/node"

export default async function handler(req, res)
{
    // The send parameter is used to send the data to the client, only when it is set to true,
    //  if we do not use it then it will auto submit the data every time when the page loads
    // or the user is doing something on the page.
    const {send} = req.query;

    const octokit = new Octokit();
    const q = "is:issue is:open label:good-first-issue"

    const response = await octokit.request('GET /search/issues', {q})
    const result = response.data.items.map((item) => {
        return {
            name: item.title,
            author: item.user.login,
            label: item.labels.map((label) => label.name),
            url: item.html_url,
 
        }
    })
    const random = Math.floor(Math.random() * result.length + 1)
    const issue = result[random]
    console.log
    if(send){

        // const novu = new Novu(process.env.NOVU_TOKEN)
        const files = fs.readdirSync(path.resolve("data"))
        const users = files.map((file) => ({
            ...JSON.parse(fs.readFileSync(path.resolve("data", file), "utf8")),
            file,
          }));
    console.log(users)
    users.forEach((user) => {
        novu.trigger('testing-novu', {
            to:{
                subscriberId: user.subscriberId,
                email: user.email,
            },
            payload: {
                name: user.name,
                title: issue.title,
                author: issue.author,
                label: issue.label.join(', '),
                url: issue.url,
            }
                 
        })
        
    });

    }
    res.status(200).json(issue)

}