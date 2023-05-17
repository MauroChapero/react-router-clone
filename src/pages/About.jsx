import { Link } from '../Link'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    description: 'Hola me llamo Mauro',
    button: 'Ir a la home'
  },
  en: {
    title: 'About us',
    description: 'Hi my name is Mauro',
    button: 'Go to home page'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src="https://pbs.twimg.com/profile_images/1658921806160441357/HlcwrjqN_400x400.jpg"
          alt="Foto de Mauro Chapero"
        />
      </div>
      <p>{i18n.description}</p>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
