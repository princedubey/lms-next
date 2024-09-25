const getCourses = async () => {
  try {
    const courses = await fetch(
      "https://learning-management-server-swart.vercel.app/1.0/courses"
    );
    return courses.json();
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  const courses = await getCourses();

  return (
    <>
      <section className="flex justify-center pt-10">
        <ul className="steps">
          <li className="step step-primary">Register</li>
          <li className="step step-primary">Choose plan</li>
          <li className="step">Purchase</li>
          <li className="step">Get dream job</li>
        </ul>
      </section>
      <div className="grid lg:grid-cols-4 gap-4 justify-center p-5">
        {courses.data.map((course) => {
          return (
            <div className="card bg-base-100 shadow-xl" key={course._id}>
              <figure>
                <img src={course.thumbnail.url} alt={course.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {course.name}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{course.description}</p>
                <div className="card-actions justify-items-stretch">
                  {course.tags.map((courseTag, index) => {
                    return (
                      <div key={index} className="badge badge-outline">
                        {courseTag}
                      </div>
                    );
                  })}
                </div>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Learn now!</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
