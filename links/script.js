const videoList = document.getElementById("videoList");
const filterInput = document.getElementById("filterInput");
const errorDisplay = document.getElementById("errorDisplay");
const apiKey = 'AIzaSyBrPxK2PojYKuYZ0bl1IXQnqc39PSSQMV8'; // Replace with your YouTube Data API key
const videoIds = [
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

async function populateVideoList() {
    videoList.innerHTML = "";
    errorDisplay.textContent = "";

    for (const videoId of videoIds) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const video = data.items[0];
                const li = document.createElement("li");
                li.innerHTML = `
                    <div class="video-thumbnail">
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img src="${video.snippet.thumbnails.medium.url}" alt="Video Thumbnail">
                        </a>
                    </div>
                `;
                videoList.appendChild(li);
            } else {
                errorDisplay.textContent = `No video data found for ${videoId}`;
            }
        } catch (error) {
            console.error(`Error fetching video data for ${videoId}:`, error);
            errorDisplay.textContent = `Error: Unable to fetch video data for ${videoId}`;
        }
    }
}

populateVideoList();

filterInput.addEventListener("input", populateVideoList);
