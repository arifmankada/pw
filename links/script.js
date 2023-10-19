const videoList = document.getElementById("videoList");
const filterInput = document.getElementById("filterInput");
const apiKey = 'AIzaSyBrPxK2PojYKuYZ0bl1IXQnqc39PSSQMV8'; // Replace with your YouTube Data API key
const videoIds = [
    "h2czRzcH_Io",
    "5uLnYmM-NaI",
    "92r4X9kYfzA",
    "WgVH2q300Hw",
    "CBLrlAD9uA8",
    "NGY1ch9hA98",
    "J8n_eTGvUvU",
    "kOUoQSnKwSw",
    "dG2q9yhjpGc",
    "4-l7cemjwyI",
    "Ua_l3gDmf2c",
    "p_bml_rHnbo",
    "eFJGyT3C-Y0",
    "an7ajeQb76s",
    // Add more video IDs here
];

async function fetchVideoData(videoId) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${AIzaSyBrPxK2PojYKuYZ0bl1IXQnqc39PSSQMV8}&part=snippet&id=${videoId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            return data.items[0];
        } else {
            throw new Error(`No video data found for ${videoId}`);
        }
    } catch (error) {
        console.error(`Error fetching video data for ${videoId}:`, error);
        return null;
    }
}

async function populateVideoList() {
    videoList.innerHTML = "";

    for (const videoId of videoIds) {
        const video = await fetchVideoData(videoId);
        if (video) {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="video-thumbnail">
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                        <img src="${video.snippet.thumbnails.medium.url}" alt="Video Thumbnail">
                    </a>
                </div>
            `;
            videoList.appendChild(li);
        }
    }
}

populateVideoList();

filterInput.addEventListener("input", populateVideoList);
