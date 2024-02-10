// import React from 'react'

const Projects = () => {
    interface Obj {
        img: string,
        description: string,
        gitlink: string
    }
    const projectArray: Obj[] = [
        {
            img: 'werew',
            description: '',
            gitlink: ''
        },
        {
            img: 'werew',
            description: '',
            gitlink: ''
        },
        {
            img: 'werew',
            description: '',
            gitlink: ''
        },
        {
            img: 'werew',
            description: '',
            gitlink: ''
        }
    ]
  return (
    <div className="Project_container">
        <section className="Project_header">
            <h1>Projects</h1>
            <span></span>
            <p>Here you will find some of the personal and clients projects that I created.</p>
        </section>
        <section className="Project_slide">
            {
                projectArray.map((props)=>(
                    <div className="Project_Card">
                        <article className="Img_container">
                            <img src={props.img} alt="a pix" />
                        </article>
                        <article className="Description_name">
                            <p>{props.description}</p>
                            <span>{props.gitlink}</span>
                        </article>
                    </div>
                ))
            }
        </section>
    </div>
  )
}

export default Projects