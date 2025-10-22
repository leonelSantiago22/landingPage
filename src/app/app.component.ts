import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'landing-page';

  @ViewChildren('section', { read: ElementRef })
  sections!: QueryList<ElementRef>;
  @ViewChildren('animatable', { read: ElementRef })
  animatableElements!: QueryList<ElementRef>;

  currentYear = new Date().getFullYear();
  isMenuOpen = false;
  activeFaqIndex: number | null = null;
  activeSection: string | null = 'home';

  navLinks = [
    { id: 'caracteristicas', name: 'Características' },
    { id: 'por-que-elegirnos', name: '¿Por qué ES360?' },
    { id: 'clientes', name: 'Clientes' },
    { id: 'faq', name: 'FAQ' },
  ];

  private observer!: IntersectionObserver;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'is-visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.animatableElements.forEach((el) => {
      this.observer.observe(el.nativeElement);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY + 100; // Offset to trigger a bit earlier
    let currentSectionId: string | null = 'home';

    this.sections.forEach((section) => {
      const element = section.nativeElement;
      if (
        element.id &&
        element.offsetTop <= scrollPosition &&
        element.offsetTop + element.offsetHeight > scrollPosition
      ) {
        currentSectionId = element.id;
      }
    });

    this.activeSection = currentSectionId;
  }

  beneficios = [
    {
      titulo: 'Comunicación Centralizada',
      descripcion:
        'Unifica todos los canales de comunicación en un solo portal accesible para directivos, docentes, padres y alumnos.',
      icono:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    },
    {
      titulo: 'Administración Simplificada',
      descripcion:
        'Automatiza tareas como el control de asistencias, la gestión de calificaciones y la generación de reportes.',
      icono:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    },
    {
      titulo: 'Seguimiento en Tiempo Real',
      descripcion:
        'Ofrece a los padres una visión clara y al instante del progreso académico y comportamiento de sus hijos.',
      icono:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
    },
  ];

  caracteristicasVisuales = [
    {
      titulo: 'Gestión Ágil',
      descripcion:
        'Optimiza cada proceso académico desde la inscripción hasta la graduación. Centraliza la administración de alumnos, asistencias y calificaciones en una sola plataforma intuitiva. Accede a historiales académicos, reportes personalizados y métricas en tiempo real, permitiendo una gestión escolar moderna, rápida y completamente digital.',
      imagen: 'gestionInteligente.webp',
    },
    {
      titulo: 'Decisiones Inteligentes',
      descripcion:
        'Convierte los datos en información útil para mejorar el desempeño institucional. Analiza tendencias académicas, mide la eficiencia de los programas y toma decisiones estratégicas con base en reportes automáticos y dashboards inteligentes. La plataforma transforma la gestión educativa en un proceso basado en evidencia y resultados.',
      imagen: 'decisionesInteligentes.webp',
    },
    {
      titulo: 'Conexión Constante',
      descripcion:
        'Fortalece la comunicación entre docentes, padres y estudiantes con canales unificados. Envía comunicados, recordatorios y notificaciones en tiempo real para mantener a toda la comunidad educativa informada. La transparencia y el acceso inmediato a la información fortalecen el vínculo escuela-hogar y promueven una participación activa.',
      imagen: 'ConexionConstante.webp',
    },
    {
      titulo: 'Seguridad Total',
      descripcion:
        'Protege los datos y la privacidad de tu institución con protocolos avanzados de seguridad digital. Toda la información académica, administrativa y personal se almacena con cifrado de alto nivel y respaldo continuo. La plataforma garantiza el cumplimiento de normas de protección de datos y un entorno confiable para todos los usuarios.',
      imagen: 'seguridadTotal.webp',
    },
  ];

  razones = [
    {
      titulo: 'Gestión Académica y Administrativa Completa',
      descripcion:
        'Simplifica todo el ciclo de vida estudiantil. Desde un módulo de inscripciones ágil que permite el registro, toma de fotografía y carga de documentos, hasta el control escolar diario y la gestión de calificaciones.',
      imagen: 'https://placehold.co/500x300/E0F2F1/374151?text=Control+Escolar',
    },
    {
      titulo: 'Administración Financiera y de Salud',
      descripcion:
        'Centraliza la información crítica de tus alumnos. Administra las finanzas, pagos y reportes con nuestro módulo financiero, y mantén un registro seguro y accesible de los expedientes médicos de la comunidad estudiantil.',
      imagen:
        'https://placehold.co/500x300/FEE2E2/374151?text=Finanzas+y+Salud',
    },
    {
      titulo: 'Comunicación y Comunidad Unificada',
      descripcion:
        'Fortalece el vínculo entre la institución, los docentes y los padres de familia. Utiliza herramientas de comunicación directa para avisos importantes y módulos de publicidad para mantener a todos informados sobre eventos.',
      imagen:
        'https://placehold.co/500x300/C7D2FE/374151?text=Comunicaci%C3%B3n',
    },
    {
      titulo: 'Ecosistema de Recursos Centralizado',
      descripcion:
        'Ofrece más que solo gestión. Brinda acceso a una biblioteca digital, genera reportes detallados por curso o área y toma decisiones basadas en datos reales. Todo en una plataforma robusta y escalable.',
      imagen:
        'https://placehold.co/500x300/FDE68A/374151?text=Biblioteca+y+Datos',
    },
  ];

  testimonios = [
    {
      cita: 'ES360 ha revolucionado nuestra comunicación interna. Los padres están más involucrados que nunca y la administración es mucho más sencilla.',
      nombre: 'Ana María López',
      cargo: 'Directora, Colegio del Sol',
      avatar: 'https://placehold.co/100x100/EED9C4/374151?text=AL',
    },
    {
      cita: 'La plataforma es increíblemente intuitiva. En menos de una semana, todo nuestro personal docente la dominaba. ¡Un cambio radical!',
      nombre: 'Carlos Valdéz',
      cargo: 'Coordinador Académico, Instituto Avante',
      avatar: 'https://placehold.co/100x100/C4D7EE/374151?text=CV',
    },
    {
      cita: 'El seguimiento de calificaciones en tiempo real es la función que más valoramos. Ha mejorado la comunicación sobre el rendimiento académico.',
      nombre: 'Sofía Herrera',
      cargo: 'Rectora, Liceo Moderno',
      avatar: 'https://placehold.co/100x100/F4C4E2/374151?text=SH',
    },
  ];

  faqs = [
    {
      pregunta: '¿ES360 es seguro para los datos de mis alumnos?',
      respuesta:
        'Absolutamente. La seguridad es nuestra máxima prioridad. Utilizamos encriptación de extremo a extremo y servidores seguros para garantizar que toda la información de tu comunidad educativa esté protegida.',
    },
    {
      pregunta: '¿La plataforma requiere una instalación compleja?',
      respuesta:
        'No. ES360 es una plataforma basada en la nube. No necesitas instalar nada. Solo necesitas un navegador web y acceso a internet para empezar a gestionar tu escuela de inmediato.',
    },
    {
      pregunta:
        '¿Ofrecen capacitación para el personal docente y administrativo?',
      respuesta:
        'Sí. Con cada plan, ofrecemos sesiones de capacitación completas para asegurar que tu equipo aproveche al máximo todas las herramientas que ES360 ofrece. También contamos con tutoriales en video y una base de conocimientos.',
    },
    {
      pregunta: '¿Puedo personalizar la plataforma con el logo de mi escuela?',
      respuesta:
        '¡Por supuesto! Ofrecemos opciones de personalización para que la plataforma refleje la identidad visual de tu institución y se sienta como una herramienta propia.',
    },
  ];

  clients = [
    {
      name: 'Universidad Nacional Autónoma de México',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo-UNAM-escalable.svg/1822px-Escudo-UNAM-escalable.svg.png',
    },
    {
      name: 'Universidad autonoma de queretaro',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/c/c6/EscudoDeLaUAQ.jpg',
    },
    {
      name: 'Universidad Nacional Autónoma de México',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo-UNAM-escalable.svg/1822px-Escudo-UNAM-escalable.svg.png',
    },
    {
      name: 'Universidad autonoma de queretaro',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/c/c6/EscudoDeLaUAQ.jpg',
    },
    {
      name: 'Universidad Nacional Autónoma de México',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo-UNAM-escalable.svg/1822px-Escudo-UNAM-escalable.svg.png',
    },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleFaq(index: number) {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }
}
