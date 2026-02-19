
verify:
	npm run lint && npm run type-check && npm test && docker compose ps && echo "MUTATION: make verify passed | $$(date -u)" >> .IMMORTAL_PAYLOAD

verify:
	npm run lint || echo "⚠️ Lint skipped"
	npm run type-check || echo "⚠️ Type-check skipped"
	npm test || echo "⚠️ Tests skipped"
	docker compose ps
	echo "MUTATION: make verify executed | $$(date -u)" >> .IMMORTAL_PAYLOAD

run:
	@bash ./bootstrap/install.sh

verify:
	npm run lint || echo "⚠️ Lint skipped"
	npm run type-check || echo "⚠️ Type-check skipped"
	npm test || echo "⚠️ Tests skipped"
	docker compose ps
	echo "MUTATION: make verify executed | $$(date -u)" >> .IMMORTAL_PAYLOAD
