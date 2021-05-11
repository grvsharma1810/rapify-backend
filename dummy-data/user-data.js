const { v4: uuidv4 } = require('uuid');

let dummyUserData = [
    {
        id: 1,
        email: "youngstunners@gmail.com",
        password: "password",
        screenName: "Young Stunners",
        userAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwngSdgWz2ZRF467gjuGxepMggnv4pT3v4lzi4Sfsfg=s88-c-k-c0x00ffffff-no-rj-mo",
        age: 22,
        videos:["1","2"],
        playlists:["1","2","3"]
    },
    {
        id: 2,
        email: "kr$na@gmail.com",
        password: "password",
        screenName: "Kr$na",
        userAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwnhC9XKl_5E3UDgnxvruP_ubsaAvAtokEMwf14eQHQ=s176-c-k-c0x00ffffff-no-rj",
        age: 25,
        videos:["3","4"],
        playlists:["4","5","6"]
    },
    {
        id: 3,
        email: "farisshafi@gmail.com",
        password: "password",
        screenName: "Faris Shafi",
        userAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwnjncQBeNDDc4UrGUtKV6WQE9jf8T0sAXopQogd87Q=s176-c-k-c0x00ffffff-no-rj",
        age: 28,
        videos:["5","6"],
        playlists:["7","8","9"]   
    },
    {
        id: 4,
        email: "karma@gmail.com",
        password: "password",
        screenName: "Karma The Lekhak",
        userAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwnj0VyuI-0myH0dplIcnwtmug074PtXVUV1rIRPxBQ=s176-c-k-c0x00ffffff-no-rj",
        age: 28,
        videos:["7","8"],
        playlists:["10","11","12"]
    },
    {
        id: 5,
        email: "jokhay@gmail.com",
        password: "password",
        screenName: "Jokhay",
        userAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwniq07bja4eFFAxifIQprPKPhiYC94D5EC7Af0U5Zg=s176-c-k-c0x00ffffff-no-rj-mo",
        age: 28,
        videos:["9","10"],
        playlists:["13","14","15"]
    },
]

module.exports = dummyUserData;