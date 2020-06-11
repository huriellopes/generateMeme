import React, { useState, useEffect } from 'react'
import qs from 'qs'

import { Wrapper, Card, Templates, Form, Button } from './style'
import Logo from '../../assets/img/logo.svg'

import api from '../../services/api'

import config from '../../config.json'

function Home () {
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [boxes, setBoxes] = useState([])
  const [generatedMeme, setGeneratedMeme] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await api.get('/get_memes')
      if (response.data.data.memes.length > 0) {
        setTemplates(response.data.data.memes)
      }
    })()
  }, [])

  const handleInputChange = (index) => (e) => {
    const newValues = boxes;
    newValues[index] = e.target.value

    setBoxes(newValues)
  }

  function handleSelectedTemplate(template) {
    setSelectedTemplate(template)
    setBoxes([])
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: `${config['username']}`,
      password: `${config['password']}`,
      boxes: boxes.map(text => ({ text }))
    })

    const response = await api.post(`/caption_image?${params}`)
    console.log(config)
    if (response.success !== false) {
      setGeneratedMeme(response.data.data.url)
    }
  }

  function handleReset () {
    setSelectedTemplate(null)
    setBoxes([])
    setGeneratedMeme(null)
  }

  return (
    <Wrapper>
      <img src={Logo} alt="MemeMaker"/>
      <Card>
        {generatedMeme && (
          <>
            <img src={generatedMeme} alt="Generated MeMe" />
            <Button type="button" onClick={handleReset}>Make My Meme</Button>
          </>
        )}

        {!generatedMeme && (
          <>
            <h2>Selecione um template: </h2>
            <Templates>
              {templates.map(meme => (
                <button
                  key={meme.id}
                  type="button"
                  onClick={() => handleSelectedTemplate(meme)}
                  className={meme.id === selectedTemplate?.id ? 'selected' : ''}
                >
                  <img src={meme.url} alt={meme.name} />
                </button>
              ))}
            </Templates>

            {selectedTemplate && (
              <>
                <h2>Textos: </h2>
                <Form onSubmit={handleSubmit}>
                  {(new Array(selectedTemplate.box_count).fill('').map((_, index) => (
                    <input type="text" key={String(Math.random())} placeholder={`Text #${index + 1}`} onChange={handleInputChange(index)} />
                  )))}

                  <Button type="submit">Make My Meme</Button>
                </Form>
              </>
            )}
          </>
        )}
      </Card>
    </Wrapper>
  )
}

export default Home
