import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showpops, setShowPops] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseDescription = quillRef.current ? quillRef.current.root.innerHTML : "";
    const courseData = {
      courseTitle,
      coursePrice,
      discount,
      image,
      courseDescription,
      chapters,
    };
    console.log(courseData);
  };

  const handleChapter = (action, chapterIndex = null) => {
    if (action === "add") {
      const title=prompt("Enter Chapter Name:")
      if(title)
      {
      const newChapter = {
        id: uniqid(),
        chapterTitle: title,
        chapterContent: [],
        collapsed:false,
        chapterOrder:chapters.length>0?chapters.slice(-1)[0].chapterOrder+1:1,
      };
      setChapters([...chapters, newChapter]);
    } }
    else if (action === "remove" && chapterIndex !== null) 
      {
      setChapters(chapters.filter((_, index) => index !== chapterIndex));
      }

    else if(action==='toggle')
    {
      setChapters.map((chapter)=>chapter.id===chapterIndex ?{...chapter,collapsed:!chapter.collapsed}:chapter)
    }
  
  };

  const handleLecture = (action, chapterIndex, lectureIndex = null) => {
    let updatedChapters = [...chapters];

    if (action === "add") {
      updatedChapters[chapterIndex].chapterContent.push({ ...lectureDetails });
      setLectureDetails({
        lectureTitle: "",
        lectureDuration: "",
        lectureUrl: "",
        isPreviewFree: false,
      });
    } else if (action === "remove" && lectureIndex !== null) {
      updatedChapters[chapterIndex].chapterContent.splice(lectureIndex, 1);
    }

    setChapters(updatedChapters);
    setShowPops(false);
  };

  return (
    <div className="h-screen overflow-scroll flex flex-col items-center justify-between md:p-8 p-4 md:pb-0 pt-8 pb-0">
      <form onSubmit={handleSubmit}>

        <div className="flex flec-col gap-1">
          <p>Course Title</p>
          <input type="text" placeholder="Type Here" onChange={e=>setCourseTitle(e.target.value)} value={courseTitle}
           className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500" required/>
        </div>


        <div className="flex flec-col gap-1">
          <p>Course Discription</p>
          <div ref={editorRef}></div>
        </div>



       <div className="flex items-center justify-between flex-wrap">

        
       <div className="flex flec-col gap-1">
          <p>Course Price</p>
          <input type="number" placeholder="Type Here" onChange={e=>setCoursePrice(e.target.value)} value={coursePrice}
           className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500" required/>
        </div>



        <div className="flex md:flex-row flex-col items-center gap-3">
          <p>Course Thumbnail</p>
          <label htmlFor="thumbnailImage" className="flex items-center gap-3">
            <img src={assets.file_upload_icon} className=""/>
            <input type="file" id="thumbnailImage" onChange={e=>setImage(e.target.files[0])} accept="image/*" hidden/>
            <img className="max-h-10" src={image? URL.createObjectURL(img):''}/>
          </label>
        </div>

       </div>

      


        <div className="flex flec-col gap-1">
          <p> Discount%</p>
          <input type="number" placeholder="Type Here" onChange={e=>setDiscount(e.target.value)} value={discount}
           className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500" required/>
        </div>

      
      

       







      {chapters.map((chapter, chapterIndex) => (
        <div key={chapter.id} className="mb-4">
          <div className="flex justify-between items-center p-4 border rounded-lg mb-4">
             <div className="flex items-center">
                <img src={assets.dropdown_icon} width={14} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`}/>

                <span className="font-semibold">{chapterIndex + 1}. {chapter.chapterTitle}</span> 
             </div>

             <span className="text-gray-500">{chapter.chapterContent.length}Lectures</span>
             <img src={assets.cross_icon} className="cursor-pointer ml-2" onClick={() => handleChapter("remove", chapterIndex)} />
          </div>



          <div>
            {
               (      
                <div className="p-4">
                {chapter.chapterContent.map((lecture, lectureIndex) => (
                  <div key={lectureIndex} className="flex justify-between items-center mb-2">
                    <span>
                      {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                      <a href={lecture.lectureUrl} target="_blank" className="text-blue-500"> Link</a> - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                    </span>
                    <img src={assets.cross_icon} className="cursor-pointer" onClick={() => handleLecture("remove", chapterIndex, lectureIndex)} />
                  </div>
                ))}
              </div>
              )
            }
          </div>

          <div className="inline-flex bg-gray-100 p-2 rounded cursor-pointer" onClick={() => {
            setShowPops(true);
            setCurrentChapterId(chapterIndex);
            setLectureDetails({ lectureTitle: "", lectureDuration: "", lectureUrl: "", isPreviewFree: false });
          }}>
            + Add Lecture
          </div>
        </div>
      ))}

      
    <div onClick={() => handleChapter("add")} className="flex justify-center items-center bg-blue-100
     p-2 rounded-lg cursor-pointer">+Add Chapter</div>

      {showpops && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white text-gray-800 p-4 rounded relative w-full max-w-80">
            <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
            <input type="text" placeholder="Lecture Title" className="block w-full p-2 border rounded mb-2" value={lectureDetails.lectureTitle} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })} />
            <input type="number" placeholder="Duration (minutes)" className="block w-full p-2 border rounded mb-2" value={lectureDetails.lectureDuration} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })} />
            <input type="text" placeholder="Lecture URL" className="block w-full p-2 border rounded mb-2" value={lectureDetails.lectureUrl} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={lectureDetails.isPreviewFree} onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })} />
              Free Preview
            </label>
            <button className="w-full bg-blue-400 text-white px-4 py-2 rounded mt-2" onClick={() => handleLecture("add", currentChapterId)}>Add Lecture</button>
            <img src={assets.cross_icon} onClick={()=>setShowPops(false)} className="absolute top-4 right-4 w-4 cursor-pointer"/>
          </div>
        </div>
      )}
      
        <button type="submit" className="w-full cursor-pointer bg-green-500 text-white p-2 rounded mt-4">Submit Course</button>
      </form>
    </div>
  );
};

export default AddCourse;

