const videoList = document.getElementById("videoList");
const filterInput = document.getElementById("filterInput");
const errorDisplay = document.getElementById("errorDisplay");
const apiKey = 'AIzaSyBrPxK2PojYKuYZ0bl1IXQnqc39PSSQMV8'; // Replace with your YouTube Data API key
const videoIds = [
    "5uLnYmM-NaI",
    "92r4X9kYfzA&t",
    "WgVH2q300Hw&t",
    "CBLrlAD9uA8&t",
    "NGY1ch9hA98&t",
    "J8n_eTGvUvU",
    "kOUoQSnKwSw&t",
    "dG2q9yhjpGc",
    "4-l7cemjwyI",
    "Ua_l3gDmf2c",
    "p_bml_rHnbo",
    "eFJGyT3C-Y0",
    "an7ajeQb76s",
    // Add more video IDs here
];

async function populateVideoList() {
    videoList.innerHTML = ""; // Clear the existing video list
    errorDisplay.textContent = ""; // Clear any previous error messages

    for (const videoId of videoIds) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`);
            const data = await response.json();
            const video = data.items[0];
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
            } else {
                // Handle the case where video data is not found
                console.error(`Video data not found for ${videoId}`);
            }
        } catch (error) {
            console.error(`Error fetching video data for ${videoId}:`, error);
            errorDisplay.textContent = "Error: Unable to fetch video data. Please try again later.";
        }
    }
}

populateVideoList();

filterInput.addEventListener("input", populateVideoList);
