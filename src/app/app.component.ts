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
    { id: 'testimonios', name: 'Testimonios' },
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
      titulo: 'Gestión Integral de Alumnos',
      descripcion:
        'Desde la inscripción hasta el historial académico, todo el ciclo de vida del estudiante en una sola plataforma. Consulta perfiles, asistencias y comportamiento con un solo clic.',
      imagen:
        'https://placehold.co/600x450/34d399/ffffff?text=Gesti%C3%B3n+de+Alumnos',
    },
    {
      titulo: 'Portal Unificado de Comunicación',
      descripcion:
        'Fortalece el lazo entre escuela y hogar. Envía comunicados masivos, mensajes directos y notificaciones push para mantener a padres y alumnos siempre informados.',
      imagen:
        'https://placehold.co/600x450/60a5fa/ffffff?text=Portal+de+Comunicaci%C3%B3n',
    },
    {
      titulo: 'Calificaciones y Reportes en Tiempo Real',
      descripcion:
        'Transparencia académica total. Los docentes registran calificaciones que se reflejan al instante en el portal de padres y alumnos, facilitando el seguimiento continuo.',
      imagen:
        'https://placehold.co/600x450/f59e0b/ffffff?text=Calificaciones+en+Vivo',
    },
  ];

  razones = [
    {
      titulo: 'Eficiencia Operativa Mejorada',
      descripcion:
        'Automatiza procesos administrativos y académicos, liberando tiempo valioso para que el personal se concentre en la enseñanza y el desarrollo estudiantil.',
      imagen:
        'https://placehold.co/500x300/E0F2F1/374151?text=Flujo+Automatizado',
    },
    {
      titulo: 'Una Comunidad Educativa Conectada',
      descripcion:
        'Fortalece la relación entre la escuela y el hogar con herramientas de comunicación instantánea que mantienen a los padres involucrados y a los alumnos informados.',
      imagen:
        'https://placehold.co/500x300/C7D2FE/374151?text=Comunicaci%C3%B3n+Fluida',
    },
    {
      titulo: 'Decisiones Basadas en Datos',
      descripcion:
        'Utiliza nuestro panel de analíticas para monitorear el rendimiento, la asistencia y otros indicadores clave, permitiendo tomar decisiones informadas para la mejora continua.',
      imagen: 'https://placehold.co/500x300/FDE68A/374151?text=Anal%C3%ADticas',
    },
    {
      titulo: 'Plataforma Escalable y Segura',
      descripcion:
        'ES360 crece junto a tu institución. Nuestra infraestructura robusta y segura garantiza que los datos de tu comunidad estén siempre protegidos y disponibles.',
      imagen: 'https://placehold.co/500x300/FECACA/374151?text=Seguridad',
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleFaq(index: number) {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }
}
