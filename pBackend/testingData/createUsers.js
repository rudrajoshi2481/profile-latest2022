const Axios = require("axios")
const chance = require("chance")


const createDataLink = "http://localhost:5000/auth/createuser"

for (let i = 0; i < 100; i++) {
    const sData = {
        name: chance().name({middle:true}),
        body: chance().paragraph({ sentences: 2 }),
        email: `${chance().email()}`,
        // email: `joshi@gmail.com`,
        phNumber: chance().phone(),
        profileImgUrl: "https:rudrajsohi.com",
        backgroundImgUrl: "asdfasfdasdf",
        verified: true,
        socialLinks: {
          github: "rudra@github.com",
          instagram: "rudra@instagram.com",
          twitter: "rudra@twitter.com",
          linkedin: "rudra@linkedin.com",
        },
        workHistory:
chance().paragraph({sentence:5}),
        password: chance().string(),
        // password: "12345",
    }

    Axios.post(createDataLink,sData).then((data) => {
        console.log(`${i} DONE`);
    }).catch(Err => {
        console.log(Err);
    })
    
}