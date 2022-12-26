import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

const KEY = "AIzaSyCN6e98GjAfa_d4E4mISSn8uCP6g5b1DvE";
export const useFetch = (term = "") => {
	const [videos, setVideos] = useState([]);
	useEffect(() => {
		searchVideo(term);
	}, [term]);

	const searchVideo = async (term) => {
		try {	
    const response = await youtube.get("/search", {
				params: {
					q: term
				},
			});
			setVideos(response.data.items);
		} catch (error) {
        console.error('error : ',error.message);
  }
};
return [videos, searchVideo];
}
const App = () => {
	const [videos,searchVideo] = useFetch();
	const [selectedVideo, setSelectedVideo] = useState();

	// we can pass this fn as inline prop because its 1 line fn
	// const onVideoSelect = (video) => {
	//   setSelectedVideo(video);
	// };

  useEffect(() => {
		setSelectedVideo(videos[0]);
	}, [videos]);

	return (
		<div className="ui container">
			<SearchBar onSubmit={searchVideo} />
			<div className="ui grid">
				<div className="ui row">
					<div className="eleven wide column">
						<VideoDetail video={selectedVideo} />
					</div>
					<div className="five wide column">
						<VideoList
							onVideoSelect={
								setSelectedVideo
							} /* === (video)=>setSelectedVideo(video) */
							videos={videos}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default App;
