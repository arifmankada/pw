const videoList = document.getElementById("videoList");
const filterInput = document.getElementById("filterInput");
const apiKey = 'AIzaSyBrPxK2PojYKuYZ0bl1IXQnqc39PSSQMV8'; // Replace with your YouTube Data API key

// Sample data - replace with your own video IDs
const videoIds = [
    "eFJGyT3C-Y0",
    "an7ajeQb76s",
    // Add more video IDs here
];

// Function to fetch video data and populate the video list
async function populateVideoList() {
    videoList.innerHTML = "";

    for (const videoId of videoIds) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`);
            const data = await response.json();
            const video = data.items[0];
            if (video) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div class="video-preview">
                        <img src="${video.snippet.thumbnails.medium.url}" alt="Video Thumbnail">
                    </div>
                    <div class="video-info">
                        <h3>${video.snippet.title}</h3>
                        <p>${video.snippet.description}</p>
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Watch on YouTube</a>
                    </div>
                `;
                videoList.appendChild(li);
            }
        } catch (error) {
            console.error(`Error fetching video data for ${videoId}:`, error);
        }
    }
}

// Initial population of the video list
populateVideoList();

// Filter videos as the user types
filterInput.addEventListener("input", populateVideoList);
