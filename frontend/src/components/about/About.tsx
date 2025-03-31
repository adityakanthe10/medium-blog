const Aboutcomp = () => {
  return (
    <section className="bg-white text-black py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Blog</h1>
        <p className="text-lg md:text-xl mb-8">
          Welcome to Your Blog, a platform designed to help you explore and
          share insightful articles, stories, and tips across various topics.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-lg">
              Our mission is to create a community where anyone can contribute,
              read, and grow. Whether you’re a budding writer or a passionate
              reader, we want to make it easy to connect and share knowledge.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Why This Blog?</h2>
            <p className="text-lg">
              This blog was born out of the desire to have a space where users
              can freely write about topics they are passionate about and share
              it with a supportive audience. Our goal is to foster creativity
              and provide valuable insights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside text-lg">
              <li>Post articles on a variety of topics</li>
              <li>Engage with content through comments</li>
              <li>Discover expert-written articles and guides</li>
              <li>Responsive design for any device</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Tech Stack</h2>
            <p className="text-lg">
              This blog was built using React.js for the frontend, with
              TailwindCSS for styling and a clean, responsive design. The
              backend is powered by a Node.js/Express API and MongoDB for
              storing content and user data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Future Goals</h2>
            <p className="text-lg">
              We aim to continuously improve the platform with new features like
              user profiles, the ability to follow favorite authors, and
              enhanced content management for writers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p className="text-lg">
              Have feedback or want to get in touch? Reach out via{" "}
              <a href="mailto:your-email@example.com" className="text-blue-500">
                email
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutcomp;
