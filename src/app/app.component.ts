import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  Renderer2,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'landing-page';

  @ViewChildren('section', { read: ElementRef })
  sections!: QueryList<ElementRef>;
  @ViewChildren('animatable', { read: ElementRef })
  animatableElements!: QueryList<ElementRef>;

  currentYear = new Date().getFullYear();
  isMenuOpen = false;
  activeFaqIndex: number | null = null;
  activeSection: string | null = 'home';
  contactForm!: FormGroup;
  formSubmitting = false;
  formSuccess = false;
  formError = false;

  navLinks = [
    { id: 'beneficios', name: 'Beneficios' },
    { id: 'caracteristicas', name: 'Características' },
    { id: 'por-que-elegirnos', name: '¿Por qué CE360?' },
    { id: 'clientes', name: 'Clientes' },
    { id: 'faq', name: 'FAQ' },
    { id: 'contacto', name: 'Contacto' },
  ];

  private observer!: IntersectionObserver;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }

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

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.formSubmitting = true;
    this.formSuccess = false;
    this.formError = false;

    const formspreeEndpoint = 'https://formspree.io/f/xvgdolzb';

    this.http
      .post(formspreeEndpoint, this.contactForm.value, {
        headers: { Accept: 'application/json' },
      })
      .subscribe({
        next: (response) => {
          this.formSuccess = true;
          this.contactForm.reset();
          this.formSubmitting = false;
        },
        error: (error) => {
          this.formError = true;
          this.formSubmitting = false;
        },
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY + 100;
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
      titulo: 'Visión Directa',
      descripcion:
        'Impulsa el crecimiento institucional con CE360, la plataforma escolar en línea que transforma la gestión académica y administrativa desde una perspectiva directiva. Su enfoque digital permite optimizar recursos, fortalecer el talento humano y generar indicadores claros de eficiencia operativa, rentabilidad y sostenibilidad educativa.',
      imagen: 'gestionInteligente.webp',
    },
    {
      titulo: 'Decisiones Inteligentes',
      descripcion:
        'Transforma la toma de decisiones en un proceso estratégico y continuo. Su arquitectura modular permite a la alta dirección visualizar metas, avances y áreas críticas en tiempo real, facilitando ajustes oportunos y fortaleciendo el liderazgo institucional.',
      imagen: 'decisionesInteligentes.webp',
    },
    {
      titulo: 'Presencia activa',
      descripcion:
        'Refleja el ritmo operativo de la institución con datos confiables y accesibles en todo momento, fortaleciendo cada acción con información precisa.',
      imagen: 'ConexionConstante.webp',
    },
    {
      titulo: 'Seguridad',
      descripcion:
        'Protege la información académica, administrativa y personal mediante roles personalizados. Su arquitectura modular y componentes integrados garantizan privacidad, cumplimiento normativo y un entorno confiable, adaptable a las necesidades operativas de cada institución.',
      imagen: 'seguridadTotal.webp',
    },
  ];

  razones = [
    {
      titulo: 'Publicidad e inscripciones',
      descripcion:
        'Monitorea la eficacia de tus campañas y convierte prospectos en alumnos con inscripciones rápidas y organizadas.',
    },
    {
      titulo: 'Control Escolar',
      descripcion:
        'Centraliza procesos escolares clave: cambios de grupo, asistencia, reportes, constancias, becas y trámites como servicio social, prácticas y titulación, según el nivel educativo. Todo en un flujo modular, ágil y confiable.',
    },
    {
      titulo: 'Asistencia',
      descripcion:
        'Registra el ingreso al plantel con credencial, reconocimiento facial o código QR. Control preciso, ágil y automatizado desde el primer acceso.',
    },
    {
      titulo: 'Finanzas',
      descripcion:
        'Centraliza la gestión financiera con control de adeudos, pagos escolares, gastos operativos y cortes de caja. Genera reportes para una administración eficiente.',
    },
    {
      titulo: 'Comunicación',
      descripcion:
        'Genera comunicados, avisos y calendario escolar con publicación en la app y notificación por correo. Comunicación ágil y centralizada.',
    },
    {
      titulo: 'Calificaciones',
      descripcion:
        'Integra módulos de calificaciones adaptados a cada nivel educativo. Permite registrar, consultar y reportar evaluaciones con criterios configurables, garantizando trazabilidad académica y compatibilidad con diversos modelos escolares.',
    },
    {
      titulo: 'Configuración y seguridad',
      descripcion:
        'Permiten parametrizar el sistema según las necesidades institucionales, definiendo accesos, permisos, estructuras operativas y reglas de funcionamiento para cada nivel y usuario.',
    },
    {
      titulo: 'Servicio medico y biblioteca',
      descripcion:
        'Registra y organiza de forma precisa la atención médica y el control bibliotecario. Dos módulos auxiliares que fortalecen la trazabilidad institucional y agregan valor operativo al ecosistema CE360.',
    },
    {
      titulo: 'Dirección y corporativo',
      descripcion:
        'Generan reportes financieros e informes de inscripción que permiten evaluar el crecimiento institucional y respaldar decisiones con datos precisos y confiables.',
    },
    {
      titulo: 'Módulos para móvil',
      descripcion:
        'Ofrece módulos móviles para alumnos y profesores, diseñados para facilitar la consulta de información académica, asistencia, evaluaciones, comunicados y trámites desde cualquier dispositivo. Acceso ágil, seguro y adaptado a cada perfil institucional.',
    },
  ];

  testimonios = [
    {
      cita: 'CE360 ha revolucionado nuestra comunicación interna. Los padres están más involucrados que nunca y la administración es mucho más sencilla.',
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
      pregunta: '¿CE360 es seguro para los datos de mis alumnos?',
      respuesta:
        'Absolutamente. La seguridad es nuestra máxima prioridad. Utilizamos encriptación de extremo a extremo y servidores seguros para garantizar que toda la información de tu comunidad educativa esté protegida.',
    },
    {
      pregunta: '¿La plataforma requiere una instalación compleja?',
      respuesta:
        'No. CE360 es una plataforma basada en la nube. No necesitas instalar nada. Solo necesitas un navegador web y acceso a internet para empezar a gestionar tu escuela de inmediato.',
    },
    {
      pregunta:
        '¿Ofrecen capacitación para el personal docente y administrativo?',
      respuesta:
        'Sí. Con cada plan, ofrecemos sesiones de capacitación completas para asegurar que tu equipo aproveche al máximo todas las herramientas que CE360 ofrece. También contamos con tutoriales en video y una base de conocimientos.',
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
