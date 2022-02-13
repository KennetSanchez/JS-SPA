const routes = {
  "/": Home,
  "/about": About,
  "/p/:id": PostShow,
  "/register": Register,
};

const router = async () => {
  const content = null || document.getElementById("page_container");

  let request = Utils.parseRequestURL();

  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener("hashchange", router);

window.addEventListener("load", router);

parseRequestURL: () => {
  let url = location.hash.slice(1).toLowerCase() || "/";
  let r = url.split("/");
  let request = {
    resource: null,
    id: null,
    verb: null,
  };
  request.resource = r[1];
  request.id = r[2];
  request.verb = r[3];

  return request;
};

let About = {
    render : async () => {
        let view =  `
            <section class="section">
                <h1> About </h1>
                <button id="myBtn"> Button</button>
            </section>
        `
        return view
    },
    after_render: async () => {
        document.getElementById("myBtn").addEventListener ("click",  () => {
            alert('Button working')
        })
    }

}

export default About;

let Bottombar = {
  render: async () => {
      let view = `
      <footer class="footer">
          <div class="content has-text-centered">
              <p>
                  This is my foot. There are many like it, but this one is(not) mine.
              </p>
          </div>
      </footer>
      `
      return view
  },
  after_render: async () => { }

}

export default Bottombar;