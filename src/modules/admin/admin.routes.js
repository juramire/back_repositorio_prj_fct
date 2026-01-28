import express from 'express';
import { requireAuth, requireAdmin } from '../../middlewares/auth.js';
import { listAdmin, getAdminProyecto, adminUpdateProyecto, adminSetStatus } from './admin.service.js';
import { asyncHandler } from '../../utils/async-handler.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get(
  '/proyectos',
  asyncHandler(async (req, res) => {
    const result = await listAdmin(req.query);
    res.json(result);
  })
);

router.get(
  '/proyectos/:id',
  asyncHandler(async (req, res) => {
    const proyecto = await getAdminProyecto(Number(req.params.id));
    if (!proyecto) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json(proyecto);
  })
);

router.put(
  '/proyectos/:id',
  asyncHandler(async (req, res) => {
    const updated = await adminUpdateProyecto(Number(req.params.id), req.body);
    res.json(updated);
  })
);

router.post(
  '/proyectos/:id/publicar',
  asyncHandler(async (req, res) => {
    const updated = await adminSetStatus(Number(req.params.id), 'PUBLISHED');
    res.json(updated);
  })
);

router.post(
  '/proyectos/:id/submitted',
  asyncHandler(async (req, res) => {
    const updated = await adminSetStatus(Number(req.params.id), 'SUBMITTED');
    res.json(updated);
  })
);

export default router;
