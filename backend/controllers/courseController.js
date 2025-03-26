// import Course from "../models/course.js";


// // get all courses
// export const getAllCourses=async(req, res)=>{

//     try {

//         const courses=Course.find({isPublished:true}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'})
//         res.json({success:true, courses});

        
//     } catch (error) {
//         res.json({success:false, message:error.message});
        
//     }
// }


// // get courses by id 
// export const getCoursesById=async(req, res)=>{
//     const {id}=req.params;
//     try {

//         const courseData= await Course.findById(id).populate({path:'educator'})

//         // Remove lectureUrl if isPreviewFree is false 
//         courseData.courseContent.forEach(chapter=>{
//             chapter.chapterContent.forEach(lecture=>{
//                 if(!lecture.isPreviewFree)
//                 {
//                     lecture.lectureUrl="";
//                 }
//             })
//         })

//         res.json({success:true, courseData});





        
//     } catch (error) {

//         res.json({success:false, message:error.message});
        
//     }
// }

import Course from "../models/course.js";

// Get all published courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .select('-courseContent -enrolledStudents') // Exclude courseContent & enrolledStudents
            .populate({ path: 'educator' });

        res.json({ success: true, courses });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get course by ID
export const getCoursesById = async (req, res) => {
    const { id } = req.params;

    try {
        const courseData = await Course.findById(id).populate({ path: 'educator' });

        if (!courseData) {
            return res.json({ success: false, message: "Course not found" });
        }

        // Remove lectureUrl if isPreviewFree is false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            });
        });

        res.json({ success: true, courseData });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
