import basededatos from './basededatos';

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {nombreAlumno} nombreAlumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  // console.log(basededatos.alumnos);
  
  let idAlumno = alumnoByNombre(nombreAlumno);
  let materias = [];
  if (idAlumno) {
    for (let i = 0; i < basededatos.calificaciones.length; i++) {
      let cal = basededatos.calificaciones[i];
      if (cal.nota >= 4 && cal.alumno === idAlumno) {
        materias.push(materiaById(cal.materia));
      }
    }
  }
  return materias;
};

const alumnoByNombre = (nombreAlumno) => {
  for (let i = 0; i < basededatos.alumnos.length; i++) {
    if (basededatos.alumnos[i].nombre === nombreAlumno) {
      return basededatos.alumnos[i].id;
    }
  }
}

const materiaById = (id) => {
  for (let i = 0; i < basededatos.materias.length; i++) {
    if (basededatos.materias[i].id === id) {
      return basededatos.materias[i];
    }
  }
  return -1;
}

const alumnoById = (id) => {
  for (let i = 0; i < basededatos.alumnos.length; i++) {
    if (basededatos.alumnos[i].id === id) {
      return basededatos.alumnos[i];
    }
  }
  return -1;
}



/**
 * Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  let resultado;
  let u = universidadByNombre(nombreUniversidad);
  let materias = [];
  let profes = [];
  let alumnos = [];
  let idProfe;
  if (u) {
    for (let i = 0; i < basededatos.materias.length; i++) {
      if (basededatos.materias[i].universidad === u.id) {
        materias.push(basededatos.materias[i]);
        for (let j = 0; j < basededatos.materias[i].profesores.length ; j++) {
          idProfe = basededatos.materias[i].profesores[j];
          let unProfe = buscarProfesorById(idProfe); 
          if (! yaExiste(unProfe.id, profes)) {
            profes.push (unProfe);
          }
        }

        for (let x = 0; x < basededatos.calificaciones.length; x ++) {
          if (basededatos.calificaciones[x].materia === basededatos.materias[i].id) {
            let unAlumno = alumnoById(basededatos.calificaciones[x].alumno);
            if (! yaExiste(unAlumno.id, alumnos)) {
              alumnos.push(alumnoById(basededatos.calificaciones[x].alumno));
            }
          }
        }
      }
    }
    u.materias = materias;
    u.profesores = profes;
    u.alumnos = alumnos;
  }
  return u;
};

const yaExiste = (id, arra) => {
  for (let x = 0; x < arra.length; x ++) {
    if (arra[x].id === id) {
      return true;
    }
  }
  return false;
}

const buscarProfesorById = (id) => {
  for (let i = 0; i < basededatos.profesores.length; i++) {
    if (basededatos.profesores[i].id === id) {
      return basededatos.profesores[i];
    }
  }
  return -1;
}
const universidadByNombre = (nombre) => {
  for (let i = 0; i < basededatos.universidades.length; i++) {
    if (basededatos.universidades[i].nombre === nombre) {
      return basededatos.universidades[i];
    }
  }
  return -1;
}

// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
// export const promedioDeEdad = () => {
//   return [];
// };

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
// export const alumnosConPromedioMayorA = (promedio) => {
//   return [];
// };

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
// export const materiasSinAlumnosAnotados = () => {
//   return [];
// };

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
// export const promedioDeEdadByUniversidadId = (universidadId) => {
//   return [];
// };
