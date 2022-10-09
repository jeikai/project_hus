import { Route, Routes } from "react-router-dom";
import NewsFeed from "./classComponent/newfeed";
import Schedule from "./classComponent/schedule";
import InClass from "./InClass";

export default function Test() {
    return(
        <>
            <InClass />
            {/* <NewsFeed /> */}
            {/* <Routes>
                <Route index path="/class/:id/newfeed" element={<NewsFeed />}></Route>
                <Route path="/class/:id/schedule" element={<Schedule />}></Route>
            </Routes> */}
        </>
    )
}