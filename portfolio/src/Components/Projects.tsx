// import React from 'react'
import ProfileImage from '../assets/my portfolio image.png'
import FumiImage from '../assets/Fumi-Waste.png'
const Projects = () => {
    interface Obj {
        id: number,
        img: string,
        title: string
        description: string,
    }
    const projectArray: Obj[] = [
        {
            id: 1,
            img: ProfileImage,
            title: 'Portfolio',
            description: 'A Portfolio I created using Front end technologies including react, typescript, scss etc. '
        },
        {
            id: 2,
            img: FumiImage,
            title: 'e-commerce web application',
            description: 'A web app where clients can request for sewage cleaning services and the same time order related products.'
        },
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
                    <div key={props.id} className="Project_Card">
                        <article className="Img_container">
                            <img src={props.img} alt="a pix" />
                        </article>
                        <article className="Description_name">
                            <p className='Description_title'>{props.title}</p>
                            <p>{props.description}</p>
                        </article>
                    </div>
                ))
            }
        </section>
    </div>
  )
}

export default Projects