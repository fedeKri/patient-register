<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="API de Pacientes",
 *     version="1.0.0",
 *     description="Documentación de la API para registrar y listar pacientes."
 * )
 *
 * @OA\Server(
 *     url="http://127.0.0.1:8001",
 *     description="Servidor local"
 * )
 *
 * @OA\Tag(
 *     name="Pacientes",
 *     description="Endpoints para la gestión de pacientes"
 * )
 */
class SwaggerController extends BaseController
{
    // Este controlador puede estar vacío.
    // Las anotaciones globales están en el docblock anterior.
}
