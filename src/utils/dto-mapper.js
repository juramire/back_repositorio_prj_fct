export const toUserDTO = row => ({
  id: row.id,
  name: row.name,
  email: row.email,
  rol: row.rol
});

const tagsFromString = raw =>
  (raw ?? '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

const parseArrayField = raw => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      /* fallthrough */
    }
    return raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  return [];
};

const baseProyecto = row => ({
  id: row.id,
  title: row.title,
  descripcion: row.descripcion,
  resumen: row.resumen,
  cicloFormativo: row.ciclo_formativo,
  cursoAcademico: row.curso_academico,
  tags: tagsFromString(row.tags),
  alumnos: row.alumnos ?? '',
  status: row.status,
  createdAt: row.created_at?.toISOString?.() ?? row.created_at,
  updatedAt: row.updated_at?.toISOString?.() ?? row.updated_at
});

export const toProyectoDTO = row => ({
  ...baseProyecto(row),
  userId: row.user_id,
  videoUrl: row.video_url ?? undefined,
  pdfUrls: parseArrayField(row.pdf_urls)
});

export const toProyectoPublicDTO = row => ({
  ...baseProyecto(row),
  videoUrl: row.video_url ?? undefined,
  pdfUrls: parseArrayField(row.pdf_urls)
});
