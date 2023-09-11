import { exceptionRouteWrapper } from '@/app/api/_lib/exception-route-wrapper';
import { OpenapiTag } from '@/app/api/_lib/openapi/enums/openapi-tag.enum';
import type { OpenapiService } from '@/app/api/_lib/openapi/openapi.service';
import { ShieldsResponseSchema } from '@/app/api/_lib/shields-badges/dtos/shields-response.dto';
import { shieldsBadgesService } from '@/app/api/_lib/shields-badges/shields-badges.service';
import { NextResponse } from 'next/server';

export const GET = exceptionRouteWrapper.wrapRoute<ShieldsResponseSchema>(() => {
	return NextResponse.json(shieldsBadgesService.getVersionBadge());
});

export function openapi(oas: OpenapiService): void {
	oas.addPath({
		method: 'get',
		path: '/stats/shields/version',
		tags: [OpenapiTag.Badges],
		summary: 'Shields.io badge for the version of this ZWS instance',
		responses: {
			200: {
				description: 'Get a JSON body with the version of this ZWS instance for use with Shields.io custom badges',
				content: {
					'application/json': {
						schema: ShieldsResponseSchema,
					},
				},
			},
		},
	});
}
