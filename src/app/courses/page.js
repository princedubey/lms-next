const getCourses = async () => {
  try {
    const courses = await fetch(`${process.env.API_URL}/courses`);
    return courses.json();
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  const courses = await getCourses();
  console.log(courses);

  return (
    <>
      <section>
        <div>
          <ul>
            {courses.data.map((course) => {
              return <li key={course._id}>{course.name}</li>;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
